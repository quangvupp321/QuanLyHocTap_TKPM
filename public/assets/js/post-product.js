$('#SubCategoryPicker').on('change', function () {
    var selectVal = $("#SubCategoryPicker option:selected").val();
    var subcateID = $("#SubCategoryPicker option:selected").index();
    var cateID = $("#SubCategoryPicker option:selected").attr('class');
    $("#Category").val(cateID);
});

bkLib.onDomLoaded(function () {
    nicEditors.allTextAreas()
});


//GET DU LIEU NHA:
function laydulieu() {
    var nicE = new nicEditors.findEditor('area2');
    question = nicE.getContent();
    console.log('aaa');
    console.log(question);
}