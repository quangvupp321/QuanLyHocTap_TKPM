function delClick(ProID)
{
    console.log(ProID);
    $('#ProID').val(ProID);
    $('#frmHidden').attr('action', '/account/watch-list/del');
    $('#frmHidden').submit();
}
