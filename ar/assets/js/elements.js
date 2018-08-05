$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function() {
    $('[data-toggle="popover"]').popover()
});


$(document).ready(function() {
    $(document).on('change', '.file-input', function() {
        var fileValue = $(this).val();
        var fileNameStart = fileValue.lastIndexOf('\\'); /* finds the end of the filepath */
        fileValue = fileValue.substr(fileNameStart + 1).substring(0, 100); /* isolates the filename */
        if (fileValue != '') {
            $(this).closest('.form-group').find('.form-control').attr("value", fileValue); /* changes the label text */
        }
    });
});

$(function() {
    $('#datetimepicker1').datetimepicker({
        format: 'DD/MM/YYYY',
    });
});
