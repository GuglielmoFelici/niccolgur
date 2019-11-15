const section = "QUEUE";
console.log("Queue.js");
$(document).ready(function () {
    const renderQueue = (queue) => {
        $.each(queue, (i, name) => {
            let user = users[name];
            $("#queue").append(
                $("<li/>")
                .append(
                    $("<img/>")
                    .attr("src", `../data/images/${user.img}`),
                    `<h2>${user.nickname}</h2>`,
                    `<p>${user.bio}</p>`
                )
                .addClass((x, old) => i === 0 ? "master" : "")
                .addClass("highlighted")
                .css("opacity", 0)
            );
        });
        $("li").addClass("highlighted");
        $("li").on("click", (event) => {
            let isSame = $(event.currentTarget).hasClass("highlighted");
            $(".highlighted").removeClass("highlighted");
            $(".profile").remove();
            if (!isSame) {
                $(event.currentTarget)
                    .addClass("highlighted")
                    .append(
                        $("<a class=\"profile\" href=\"#\">VAI AL PROFILO</a>")
                        .hide()
                        .fadeIn(300));
            }
        });
        $("li").each((i, e) => {
            setTimeout(() => $(e).css("opacity", 1), i * 120);
            setTimeout(() => $(e).removeClass("highlighted"), 500 + i * 100);

        });
    }
    $.ajax({
        url: 'https://guglielmofelici.github.io/niccolgur/data/users.json',
        success: (response) => {
            export const users = response;
            $.ajax({
                url: 'https://guglielmofelici.github.io/niccolgur/data/queue.json',
                success: renderQueue,
                cache: false
            });
        }
    })



});