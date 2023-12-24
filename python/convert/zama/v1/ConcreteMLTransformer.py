import ast
import sys
import subprocess
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
        # 클래스 생성 호출에 n_bits=8 추가
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

    # 모델 저장 코드 추가
    save_code_str = f"""
directory_name =  '/app/results'
fhemodel_dev = FHEModelDev(directory_name, {transformer.model_variable_name})
fhemodel_dev.save()
"""
    save_code = ast.parse(save_code_str).body
    transformed_tree.body.extend(save_code)

    return astor.to_source(transformed_tree)

def execute_transformed_code(transformed_code):
    # concrete-ml 모듈 설치 확인 및 설치
    try:
        import concrete
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "concrete-ml"])
        import concrete
    try:
        exec(transformed_code)
        return "성공"
    except Exception as e:
        return f"실패: {e.__class__.__name__}: {e}"

def main():
    # metadata.json 파일에서 zama 버전 정보 읽기
    metadata_path = "metadata.json"
    with open(metadata_path, "r") as file:
        metadata = json.load(file)
        zama_version = metadata["zama"]["lib"]["latestVersion"]

    # 커맨드 라인 인자로 전달된 사용자 코드 받기
    if len(sys.argv) > 1:
        user_code = sys.argv[1]
        converted_code = convert_to_concrete_ml(user_code)
        execution_result = execute_transformed_code(converted_code)
        print(execution_result)
    else:
        print("사용자 코드가 제공되지 않았습니다.")

if __name__ == "__main__":
    main()