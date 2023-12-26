define([
    'base/js/namespace',
    'base/js/dialog',
    './js/transformer'
], function(Jupyter, dialog, TransFormer) {

    class DeployZama {
        constructor() {
            this.dialogInstance = null;
            this.dialogBody = null;
        }

        async deploy(userCode) {
            try {
    
                //스텝1 : 코드 컨버팅
                const make_code = TransFormer.executeTransformerCode(userCode);
                this.showDialog('Deploying', 'Running Step 1...');
                const converted_code = await this.executePythonCode(make_code);
                console.log("Converted Code")
                console.log(converted_code);
                this.updateDialog('FHE Conversion Complete', converted_code);

                // Step 2, Step 3, Step 4 등의 추가 단계를 여기에 구현할 수 있습니다.
                // 예: this.executePythonCode('추가 Python 코드')

            } catch (error) {
                this.updateDialog('Error', error.message);
            }
        }

        executePythonCode(code) {
            return new Promise((resolve, reject) => {
                Jupyter.notebook.kernel.execute(code, {
                    iopub: {
                        output: (data) => {
                            let content = data.content;
                            if (content.text) {
                                resolve(content.text);
                            } else if (content.evalue) {
                                reject(new Error(content.evalue));
                            } else {
                                reject(new Error('Unknown error'));
                            }
                        }
                    }
                }, { silent: false });
            });
        }

        showDialog(title, message) {
            this.dialogBody = $('<div/>').text(message);
            this.dialogInstance = dialog.modal({
                title: title,
                body: this.dialogBody,
                buttons: {
                    '확인': {}
                }
            });
        }

        updateDialog(title, message) {
            if (this.dialogInstance) {
                this.dialogBody.text(message);
                this.dialogInstance.find('.modal-title').text(title);
            } else {
                this.showDialog(title, message);
            }
        }
    }

    return DeployZama;
});