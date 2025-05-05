<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telefone = strip_tags(trim($_POST["telefone"]));
    $assunto = strip_tags(trim($_POST["assunto"]));
    $mensagem = trim($_POST["mensagem"]);

    // Validação simples
    if (empty($nome) || empty($email) || empty($telefone) || empty($assunto) || empty($mensagem)) {
        echo "Todos os campos são obrigatórios.";
        exit;
    }

    $to = "alex07viante@gmail.com"; // <-- coloque aqui seu e-mail
    $subject = "Contato do Site: $assunto";
    $body = "Nome: $nome\n";
    $body .= "E-mail: $email\n";
    $body .= "Telefone: $telefone\n";
    $body .= "Assunto: $assunto\n\n";
    $body .= "Mensagem:\n$mensagem";

    $headers = "From: $nome <$email>";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem.";
    }
}
?>
