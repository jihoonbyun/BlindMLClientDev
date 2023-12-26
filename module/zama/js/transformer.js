define(function() {
    function executeTransformerCode(user_code) {

        tranformerCode = `
# 여기에 Python 코드
import ast
import sys
import subprocess
import base64
import json
# astor 모듈 설치 확인 및 설치
try:
    import astor
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "astor"])
    import astor

class ConcreteMLTransformer(ast.NodeTransformer):
    def __init__(self):
        self.supported_classes = {
            "LinearRegression", "LogisticRegression", "LinearSVC", "LinearSVR",
            "PoissonRegressor", "TweedieRegressor", "GammaRegressor", "Lasso",
            "Ridge", "ElasticNet", "SGDRegressor"
        }
        self.model_variable_name = None

    def visit_Import(self, node):
        for alias in node.names:
            if 'sklearn.linear_model' in alias.name:
                alias.name = alias.name.replace('sklearn.linear_model', 'concrete.ml.sklearn')
        return node

    def visit_ImportFrom(self, node):
        if node.module == 'sklearn.linear_model':
            node.module = 'concrete.ml.sklearn'
        return node

    def visit_Assign(self, node):
        if isinstance(node.value, ast.Call) and isinstance(node.value.func, ast.Name):
            if node.value.func.id in self.supported_classes:
                self.model_variable_name = node.targets[0].id
        return node

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name) and node.func.id in self.supported_classes:
            n_bits_arg = ast.keyword(arg='n_bits', value=ast.Num(n=8))
            node.keywords.append(n_bits_arg)
        elif isinstance(node.func, ast.Attribute) and node.func.attr in self.supported_classes:
            n_bits_arg = ast.keyword(arg='n_bits', value=ast.Num(n=8))
            node.keywords.append(n_bits_arg)
        return self.generic_visit(node)

def convert_to_concrete_ml(user_code):
    tree = ast.parse(user_code)
    transformer = ConcreteMLTransformer()
    transformed_tree = transformer.visit(tree)

    save_code_str = """
directory_name = '/app/results'
fhemodel_dev = FHEModelDev(directory_name, {}""".format(transformer.model_variable_name) + """)
fhemodel_dev.save()
"""
    save_code = ast.parse(save_code_str).body
    transformed_tree.body.extend(save_code)

    return astor.to_source(transformed_tree)

def transform_code(encoded_user_code):
    #decoded_user_code = base64.b64decode(encoded_user_code).decode('utf-8')
    #converted_code = convert_to_concrete_ml(decoded_user_code)
    #return converted_code
    return convert_to_concrete_ml(encoded_user_code)

`

        userCode = `user_code="""`  + user_code + `"""`

        executeCode = `
print(transform_code(encoded_user_code))
        `;

        const combinedCode = tranformerCode  + userCode + executeCode

   
        return combinedCode;
        /*
        Jupyter.notebook.kernel.execute(combinedCode, {
            iopub: {
                output: (msg) => {
                    console.log("converted_code",msg.content.text);
                }
            }
        });
        */

    }

    return {
        executeTransformerCode: executeTransformerCode
    };
});
