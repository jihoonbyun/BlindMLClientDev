// buildProcess.js
define([
    'base/js/namespace',
    'base/js/dialog'
], function(Jupyter, dialog) {
    function deployZama() {
        var metadataPath = "metadata.json";
        
        // metadata.json 파일 읽기
        var metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        var zamaVersion = metadata.lib.zama.latestVersion;
    
        // Python 스크립트 실행 명령
        var executeZamaCommand = `python ./python/convert/zama/${zamaVersion}/ConcreteMLTransformer.py ${JSON.stringify(userCode)}`;
    
        Jupyter.notebook.kernel.execute(executeZamaCommand, {
            iopub: {
                output: function(response) {
                    var result = response.content['text/plain'];
                    var title = result.includes("성공") ? '변환 성공' : '변환 실패';
                    var body = $('<div/>').text(result);
                    
                    dialog.modal({
                        title: title,
                        body: body,
                        buttons: {
                            '확인': {}
                        }
                    }).modal('show');
                }
            }
        }, {silent: false});
    }

    function deployCsem() {
        alert("TODO"); // Replace with actual logic
    }

    function openRepository() {
        alert("Opening Repository..."); // Replace with actual logic
    }

    function openPreference() {
        alert("Opening Preference..."); // Replace with actual logic
    }

    function openUserGuide() {
        alert("Opening User Guide..."); // Replace with actual logic
    }

    function openVersion() {
        alert("Showing Version..."); // Replace with actual logic
    }

    return {
        deployZama: deployZama,
        deployCsem: deployCsem
        
    };
});
