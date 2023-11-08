// main.js
define([
    'base/js/namespace',
    'base/js/events',
    './scripts/BuildProcess'  // 상대 경로로 BuildProcess 모듈을 참조
], function(Jupyter, events, BuildProcess) {
    function createBuildMLMenu() {
        // 메뉴 아이템이 추가될 위치를 찾습니다.
        var $navbar = $("#maintoolbar-container");
        
        // BuildML 메뉴를 생성합니다.
        var $buildMLMenu = $('<div/>').addClass('btn-group').attr('id', 'buildml-menu');
        
        // 메뉴 버튼을 생성합니다.
        var $buildMLButton = $('<button/>')
            .addClass('btn btn-default dropdown-toggle')
            .attr('data-toggle', 'dropdown')
            .text('BuildML ')
            .append($('<span/>').addClass('caret'));
        $buildMLMenu.append($buildMLButton);
        
        // 드롭다운 메뉴를 생성합니다.
        var $buildMLDropdown = $('<ul/>').addClass('dropdown-menu');
        $buildMLMenu.append($buildMLDropdown);

        // 메뉴 항목을 추가합니다.
        $buildMLDropdown.append($('<li/>').append($('<a/>').text('Build').on('click', BuildProcess.extractPythonFunctions))); // Function name is now in camelCase
        $buildMLDropdown.append($('<li/>').append($('<a/>').text('Deploy').on('click', function() { console.log('Deploy clicked'); })));
        $buildMLDropdown.append($('<li/>').append($('<a/>').text('Repository').on('click', function() { console.log('Repository clicked'); })));
        $buildMLDropdown.append($('<li/>').append($('<a/>').text('KMS').on('click', function() { console.log('KMS clicked'); })));

        // 메뉴를 나비게이션 바에 추가합니다.
        $navbar.append($buildMLMenu);
    }
    
    function load_extension() {
        // 메뉴를 생성합니다.
        createBuildMLMenu();
        
        console.log("BuildML extension loaded.");
    }
    
    return {
    load_ipython_extension: load_extension
    };
});
