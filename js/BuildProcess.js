// bui
define([
    'base/js/namespace',
    '../module/zama/deploy',
], function(Jupyter, DeployZama) {

    var metadata = null;

    function setMetadata(md) {
        metadata = md;
    }

    function deployZamaWrapper() {
        var codeCells = Jupyter.notebook.get_cells().filter(function(cell) {
            return cell.cell_type === 'code';
        });
        var userCode = codeCells.map(function(cell) {
            return cell.get_text();
        }).join('\n');

        if (metadata) {
            var zamaVersion = metadata.module.zama.version;

            // DeployZama 클래스 인스턴스 생성
            var deployer = new DeployZama();
            deployer.deploy(userCode).then(() => {
                console.log("Deployment completed successfully");
            }).catch((error) => {
                console.error("Deployment failed: ", error);
            });
            


        } else {
            console.error("Metadata is not set");
        }
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
        setMetadata: setMetadata,
        deployZama: deployZamaWrapper,
        deployCsem: deployCsem,
        openRepository: openRepository,
        openPreference: openPreference,
        openUserGuide: openUserGuide,
        openVersion: openVersion
    };
});
