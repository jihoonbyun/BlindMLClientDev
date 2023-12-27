define([
    'base/js/namespace',
    'base/js/dialog',
    './js/transformer'
], function(Jupyter, dialog, TransFormer) {

    class BuildZama {
        constructor() {
            this.dialogInstance = null;
            this.dialogBody = null;
        }

        async build(userCode) {
            try {
    
                //스텝1 : 코드 컨버팅
                const make_code = TransFormer.executeTransformerCode(userCode);
                this.showDialog('Converting', 'Currently converting the Python code to FHE format. Please wait a moment.');
                const converted_code = await this.executePythonCode(make_code);
                console.log("Converted Code");
                console.log(converted_code);
                this.updateDialog('Conversion Complete', converted_code);

                // Step 2: 코드 실행
                this.updateDialog('Compiling...', 'Compiling the transformed FHE code. Please wait a moment.');
                await this.executePythonCode(converted_code);
                this.updateDialog('Build Complete', "The FHE model has been successfully built and it is saved in 'blindml_output' folder. (Please proceed with 'deploy')");
    

            } catch (error) {
                this.updateDialog('Oops!', error.message);
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

    return BuildZama;
});