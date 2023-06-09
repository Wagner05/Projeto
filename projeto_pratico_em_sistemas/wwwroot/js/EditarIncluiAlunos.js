var ultimoId = 0;
var linhaSelecionadaId = null;

function verificarRegistros() {
    var registros = $('tbody tr');

    if (registros.length == 0) {
        $('#semAlunos').addClass('existeAlunos');
    }
}

function limparModal() {
    $('#nome').val('');
    $('#nota').val('');
    $('#presenca').val('');
    $('#observacao').val('');
}
function limparModalEditar() {
    $('#nomeEditar').val('');
    $('#notaEditar').val('');
    $('#presencaEditar').val('');
    $('#observacaoEditar').val('');
}
function substituirVirgulaPorPonto(valor) {
    if (valor !== null && valor !== undefined) {
        return parseFloat(valor.toString().replace(',', '.'));
    } else {
        return valor;
    }
}
$(document).ready(function () {

    $('#btnSalvar').click(function () {
        var nome = $('#nome').val();
        var nota = substituirVirgulaPorPonto($('#nota').val());
        var presenca = parseInt($('#presenca').val());
        var observacao = $('#observacao').val();

        if (/^[a-zA-Z\s]+$/.test(nome)) {

            if (!isNaN(nota) && nota >= 0 && nota <= 10) {


                if (!isNaN(presenca) && presenca >= 0 && presenca <= 100) {

                    ultimoId++;
                    var novoId = 'registro-' + ultimoId;

                    var novaLinha = '<tr data-id="' + novoId + '" class="linha-registro">' +
                        '<td class="' + novoId + ' nome">' + nome + '</td>' +
                        '<td class="' + novoId + ' nota">' + nota + '</td>' +
                        '<td class="' + novoId + ' presenca">' + presenca + '</td>' +
                        '<td class="' + novoId + ' observacao">' + observacao + '</td>' +
                        '<td><button class="btn btn-primary btn-editar" id="btnEditar">Editar</button><button class="btn btn-danger btn-excluir">Excluir</button></td>' +
                        '</tr>';

                    $('tbody').append(novaLinha);

                    $('#modalIncluir').modal('hide');
                    $('#semAlunos').addClass('existeAlunos');

                } else {
                    alert('A presença deve ser um número inteiro entre 0 e 100.');
                }
            } else {
                alert('A nota deve ser um número decimal entre 0 e 10.');
            }
        } else {
            alert('O nome deve conter apenas letras, sem caracteres especiais, acentos ou pontuação.');
        }
    });
    $('#btnSalvarEdicao').click(function () {
        var nome = $('#nomeEditar').val();
        var nota = substituirVirgulaPorPonto($('#notaEditar').val());
        var presenca = parseInt($('#presencaEditar').val());
        var observacao = $('#observacaoEditar').val();


        if (/^[a-zA-Z\s]+$/.test(nome)) {
            if (!isNaN(nota) && /^([0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/.test(nota) && nota >= 0 && nota <= 10) {
                if (!isNaN(presenca) && /^[0-9]+$/.test(presenca) && presenca >= 0 && presenca <= 100) {
                    if (linhaSelecionadaId) {
                        $('.' + linhaSelecionadaId + '.nome').text(nome);
                        $('.' + linhaSelecionadaId + '.nota').text(nota);
                        $('.' + linhaSelecionadaId + '.presenca').text(presenca);
                        $('.' + linhaSelecionadaId + '.observacao').text(observacao);
                    }
                    $('#modalEditar').modal('hide');
                } else {
                    alert('Por favor, insira um valor de presença válido (entre 0 e 100).');
                }
            } else {
                alert('Por favor, insira uma nota válida (entre 0 e 10).');
            }
        } else {
            alert('Por favor, insira um nome válido. Use apenas letras, sem caracteres especiais, acentos ou pontuação.');
        }

    });

    $('body').on('click', '.btn-editar', function () {
        linhaSelecionadaId = $(this).closest('tr')[0].dataset.id;
        var linha = $(this).closest('tr');
        var nome = linha.find('td:nth-child(1)').text();
        var nota = linha.find('td:nth-child(2)').text();
        var presenca = linha.find('td:nth-child(3)').text();
        var observacao = linha.find('td:nth-child(4)').text();

        $('#nomeEditar').val(nome);
        $('#notaEditar').val(nota);
        $('#presencaEditar').val(presenca);
        $('#observacaoEditar').val(observacao);

        $('#modalEditar').modal('show');
    });

    $('#btnIncluir').on('click', function () {
        $('#modalIncluir').modal('show');
        limparModal();
    });

    $('body').on('click', '.btn-excluir', function () {
        $(this).closest('tr').remove();
        verificarRegistros();
    });

    $('#btnCancelar').click(function () {
        limparModal();
        $('#modalIncluir').modal('hide');
    });

    $('.close').click(function () {
        limparModal();
        limparModalEditar();
        $('#modalEditar').modal('hide');
        $('#modalIncluir').modal('hide');
    });

    $('#btnCancelarEditar').click(function () {
        limparModalEditar()
        $('#modalEditar').modal('hide');
    });


});


