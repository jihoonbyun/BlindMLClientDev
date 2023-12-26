// buildProcess.js
define([
    'base/js/namespace',
    'base/js/dialog',

], function(Jupyter, dialog) {


    function deployZamaWrapper() {
        // 현재 노트북의 모든 셀의 코드를 읽어옵니다.
        var codeCells = Jupyter.notebook.get_cells().filter(function(cell) {
            return cell.cell_type === 'code';
        });
        var userCode = codeCells.map(function(cell) {
            return cell.get_text();
        }).join('\n');

        // metadata.json 파일에서 버전 정보를 읽습니다.
        var metadata = JSON.parse(fs.readFileSync('../../metadata.json', 'utf8'));
        var zamaVersion = metadata.module.zama.version;

        // 동적으로 deploy.js 모듈을 로드합니다.
        require(['../module/zama/' + zamaVersion + '/deploy'], function(DeployZama) {
            var deployer = new DeployZama();
            deployer.deploy(userCode).then(() => {
                console.log("Deployment completed successfully");
            }).catch((error) => {
                console.error("Deployment failed: ", error);
            });
        });
    }


    function deployCsem() {
        alert("TODO"); // Replace with actual logic
    }

    function openRepository() {
        alert("Opening Repository..."); 
    }

    function openPreference() {
        alert("Opening Preference..."); 
    }

    function openUserGuide() {
        alert("Opening User Guide...");     
    }

    function openVersion() {
        alert("Showing Version..."); 
    }

    return {
        deployZama: deployZamaWrapper,
        deployCsem: deployCsem
        
    };
});
