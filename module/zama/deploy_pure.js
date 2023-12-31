define([
    'base/js/namespace',
    'base/js/dialog'
], function(Jupyter, dialog) {

    class DeployZama {
        constructor() {
            this.dialogInstance = null;
            this.dialogBody = null;
        }

        async deploy(userCode) {
            try {
                // userCode를 Base64로 인코딩
                const encodedUserCode = btoa(userCode);

                 console.log("start")


                // Python 스크립트 실행
                const pythonCommand = `
import subprocess
subprocess.run(['python', 'python/transformer.py', '${encodedUserCode}'])
`;
                this.showDialog('Deploying', 'Running Step 1...');
                const result1 = await this.executePythonCode(pythonCommand);
                console.log(result1);
                this.updateDialog('Step 1 Complete', result1);

                alert("finish")



                // Step 2: conrete-image와 합본 이미지 생성 및 실행
                //this.updateDialog('Deploying', 'Running Step 2...');
                //const result2 = await this.executePythonCode('!python compiler.py');
                //this.updateDialog('Step 2 Complete', result2);

                // Step 3: 노드 서버 합본 이미지 생성
                // Step 4: 서버 이미지 업로드

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
        step3(previousResult) {
            // Step 3 logic here
        }

        step4(previousResult) {
            // Step 4 logic here
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
