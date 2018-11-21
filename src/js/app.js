import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);

        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        $('#parsedCode').append(tableIt(parsedCode));
    });
});

const tableIt = (list) => {
    let tab = '<table border=1>';
    tab+= '<td>'+'line'+'</td>';
    tab+='<td>'+'type'+'</td>';
    tab+='<td>'+'name'+'</td>';
    tab+='<td>'+'condition'+'</td>';
    tab+='<td>'+'value'+'</td>';
    for (let i=0; i<list.length;i++){
        tab+='<tr>';
        tab+= '<td>'+list[i].line+'</td>';
        tab+='<td>'+list[i].Type+'</td>';
        tab+='<td>'+list[i].name+'</td>';
        tab+='<td>'+list[i].condition+'</td>';
        tab+='<td>'+list[i].value+'</td>';
        tab+='</tr>';
    }
    tab+='</table>';
    document.body.innerHTML = tab;
};
