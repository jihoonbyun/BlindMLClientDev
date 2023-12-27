// bui
define([
    'base/js/namespace',
    '../module/zama/build_zama',
], function(Jupyter, BuildZama) {

    var metadata = null;

    function setMetadata(md) {
        metadata = md;
    }

    function buildZamaWrapper() {
        var codeCells = Jupyter.notebook.get_cells().filter(function(cell) {
            return cell.cell_type === 'code';
        });
        var userCode = codeCells.map(function(cell) {
            return cell.get_text();
        }).join('\n');

        if (metadata) {
            var zamaVersion = metadata.module.zama.version;

            // BuildZama 클래스 인스턴스 생성
            var builder = new BuildZama();
            builder.build(userCode).then(() => {
                console.log("FHE Model build completed successfully");
            }).catch((error) => {
                console.error("Vuild failed: ", error);
            });
            
        } else {
            console.error("Metadata is not set");
        }
    }

    function generateKeys(){

    }
    function removeKeys() {

    }
    function kms(){
        
    }


    function deploy() {
        alert("TODO")
    }

    function buildCsem() {
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
        buildZama: buildZamaWrapper,
        deploy : deploy,
        buildCsem: buildCsem,
        openRepository: openRepository,
        openPreference: openPreference,
        openUserGuide: openUserGuide,
        openVersion: openVersion,
        generateKeys: generateKeys,
        removeKeys : removeKeys,
        kms:kms
    };
});
