// main.js
// main.js
define([
    'base/js/namespace',
    'base/js/events',
    'jquery',
    './metadata',  // Metadata 모듈 추가
    './js/BuildProcess'  // BuildProcess 모듈
], function(Jupyter, events, $, metadata, BuildProcess) {
    function createBlindMLMenu() {

        // Metadata 정보를 BuildProcess 모듈에 전달
        BuildProcess.setMetadata(metadata);

        // Find where to add the menu items
        var $navbar = $("#maintoolbar-container");

        // Create the BlindML menu
        var $blindMLMenu = $('<div/>').addClass('btn-group').attr('id', 'blindml-menu');

        // Create the menu button
        var $button = $('<button/>')
            .addClass('btn btn-default dropdown-toggle')
            .attr('data-toggle', 'dropdown')
            .text('BlindML ')
            .append($('<span/>').addClass('caret'));
        $blindMLMenu.append($button);

        // Create the dropdown menu
        var $blindMLDropdown = $('<ul/>').addClass('dropdown-menu');
        $blindMLMenu.append($blindMLDropdown);

        // Add menu items
        var $buildMenu = $('<li/>').addClass('dropdown-submenu');
        $buildMenu.append($('<a/>').text('Build FHE Model'));
        var $buildDropdown = $('<ul/>').addClass('dropdown-menu');
        $buildDropdown.append($('<li/>').append($('<a/>').text('ZAMA').css('cursor', 'pointer').on('click', BuildProcess.buildZama)));
        $buildDropdown.append($('<li/>').append($('<a/>').text('CSEM').css('cursor', 'pointer').on('click', BuildProcess.buildCsem)));
        $buildMenu.append($buildDropdown);
        $blindMLDropdown.append($buildMenu);


        var $deployMenu = $('<li/>').addClass('dropdown-menu');
        $deployMenu.append($('<a/>').text('Deploy').css('cursor', 'pointer').on('click', BuildProcess.deploy));
        $blindMLDropdown.append($deployMenu);


        var $settingsMenu = $('<li/>').addClass('dropdown-submenu');
        $settingsMenu.append($('<a/>').text('Settings'));
        var $settingsDropdown = $('<ul/>').addClass('dropdown-menu');
        $settingsDropdown.append($('<li/>').append($('<a/>').text('Repository').on('click', BuildProcess.openRepository)));
        $settingsDropdown.append($('<li/>').append($('<a/>').text('Preference').on('click', BuildProcess.openPreference)));
        $settingsMenu.append($settingsDropdown);
        $blindMLDropdown.append($settingsMenu);

        var $helpMenu = $('<li/>').addClass('dropdown-submenu');
        $helpMenu.append($('<a/>').text('Help'));
        var $helpDropdown = $('<ul/>').addClass('dropdown-menu');
        $helpDropdown.append($('<li/>').append($('<a/>').text('User Guide').on('click', BuildProcess.openUserGuide)));
        $helpDropdown.append($('<li/>').append($('<a/>').text('Version').on('click', BuildProcess.openVersion)));
        $helpDropdown.append($('<li/>').append($('<a/>').text('Updates').on('click', BuildProcess.checkUpdates)));
        $helpDropdown.append($('<li/>').append($('<a/>').text('Report Issue').on('click', BuildProcess.reportIssue)));
        $helpMenu.append($helpDropdown);
        $blindMLDropdown.append($helpMenu);

        // Add the menu to the navbar
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
