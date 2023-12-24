// main.js
define([
    'base/js/namespace',
    'base/js/events',
    'jquery',
    './js/BuildProcess'  // Referencing BuildProcess module
], function(Jupyter, events, $, BuildProcess) {
    function createBlindMLMenu() {
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
        var $deployMenu = $('<li/>').addClass('dropdown-submenu');
        $deployMenu.append($('<a/>').text('Deploy to FHE Model'));
        var $deployDropdown = $('<ul/>').addClass('dropdown-menu');
        $deployDropdown.append($('<li/>').append($('<a/>').text('ZAMA').on('click', BuildProcess.deployZama)));
        $deployDropdown.append($('<li/>').append($('<a/>').text('CSEM').on('click', BuildProcess.deployCsem)));
        $deployMenu.append($deployDropdown);
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
