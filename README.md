Com a "Versão definitiva", teremos que alterar a forma que o canal FVE consome/utiliza o MFE do consignado.

Itens técnicos dentro do canal FVE que devemos ter uma atenção nos pontos abaixo:
Injeção do MFE-consignado utilizando parâmetros. Por conta da forte dependência do @fve/core atualmente passamos por parâmetros ['ola-consigned', 'start'] - indicando uma modificação no spa-base e mfe-recommendation.

Dados de contexto, para o MFE-consignado conseguir trabalhar nos canais os mesmos precisam ter um padrão (peça) para gerenciar os contextos, no caso o @afe/context-hanlder (lembrando que precisamos utilizar o módulo disponível com Inherited, precisa validar com a @AFE quando essa peça vai estar disponível)  o qual atualmente não utilizamos no canal FVE - indicando uma modificação no spa-base.
JWT. A estrutura do json web token é diferente em cada canal, como devemos tratar isso?



- Com a "Versão definitiva", precisamos mudar como o canal FVE usa o MFE do consignado.
- Dentro do canal FVE, alguns pontos técnicos precisam de atenção, como a injeção do MFE-consignado usando parâmetros.
- Devido à forte dependência do @fve/core, atualmente usamos os parâmetros ['ola-consigned', 'start'] - indicando uma mudança no spa-base e mfe-recommendation.
- Para que o MFE-consignado funcione nos canais, eles precisam seguir um padrão de contexto, utilizando o @afe/context-handler (verificando a disponibilidade com a @AFE) - isso requer uma modificação no spa-base.
- Quanto ao JWT, a estrutura do json web token difere em cada canal, então precisamos discutir como lidar com essa diversidade.
