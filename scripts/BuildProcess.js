// BuildProcess.js
define([
    'base/js/namespace',
    'base/js/events'
], function(Jupyter, events) {
    function extractPythonFunctions() {
        // 현재 열려 있는 노트북의 모든 셀을 가져옵니다.
        var cells = Jupyter.notebook.get_cells();
        
        // 모든 셀을 순회하며 Python 함수를 찾습니다.
        cells.forEach(function(cell) {
            if (cell.cell_type === 'code') {
                // 셀의 코드를 가져옵니다.
                var code = cell.get_text();
                // 정규 표현식을 사용하여 Python 함수를 추출합니다.
                var functionPattern = /def\s+[\w_]+\s*\(([\s\S]*?)\):/g;
                var match;
                while ((match = functionPattern.exec(code)) !== null) {
                    console.log('Found Python function:', match[0]);
                }
            }
        });
    }

    function load_ipython_extension() {
        console.log('BuildProcess extension loaded');
        // 필요한 경우, 여기서 extractPythonFunctions()을 호출하거나 다른 이벤트에 바인딩할 수 있습니다.
    }

    return {
        load_ipython_extension: load_ipython_extension,
        extractPythonFunctions: extractPythonFunctions
    };
	
});
