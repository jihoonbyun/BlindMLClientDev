// main.js
define([
    'base/js/namespace',
    'base/js/events',
    'jquery',
    './scripts/BuildProcess'  // 상대 경로로 BuildProcess 모듈을 참조
], function(Jupyter, events, $, BuildProcess) {
    function createBlindMLMenu() {
        // 메뉴 아이템이 추가될 위치를 찾습니다.
        var $navbar = $("#maintoolbar-container");
        
        // BuildML 메뉴를 생성합니다.
        var $blindMLMenu = $('<div/>').addClass('btn-group').attr('id', 'blindml-menu');
        
        // 메뉴 버튼을 생성합니다.
        var $Button = $('<button/>')
            .addClass('btn btn-default dropdown-toggle')
            .attr('data-toggle', 'dropdown')
            .text('BlindML ')
            .append($('<span/>').addClass('caret'));
        $blindMLMenu.append($Button);
        
        // 드롭다운 메뉴를 생성합니다.
        var $blindMLDropdown = $('<ul/>').addClass('dropdown-menu');
        $blindMLMenu.append($blindMLDropdown);

        // 메뉴 항목을 추가합니다.
        $blindMLDropdown.append($('<li/>').append($('<a/>').text('Build').on('click', BuildProcess.load_ipython_extension))); // Function name is now in camelCase
        $blindMLDropdown.append($('<li/>').append($('<a/>').text('Deploy').on('click', function() { console.log('Deploy clicked'); })));
        $blindMLDropdown.append($('<li/>').append($('<a/>').text('Repository').on('click', function() { console.log('Repository clicked'); })));
        $blindMLDropdown.append($('<li/>').append($('<a/>').text('KMS').on('click', function() { console.log('KMS clicked'); })));

        // 메뉴를 나비게이션 바에 추가합니다.
        $navbar.append($blindMLMenu);
    }

    function load_ipython_extension() {
        if (Jupyter.notebook !== undefined && Jupyter.notebook.kernel !== undefined) {
            createBlindMLMenu();
        }
    }
    
    return {
    load_ipython_extension: load_ipython_extension
    };
});
