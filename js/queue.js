const section = "QUEUE";
$(document).ready(function () {
    let queue = $("#queue");

    $.each(db.queue, (i) => {
        let user = db.users[db.queue[i]];
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
            $(event.currentTarget).addClass("highlighted");
            $(event.currentTarget).append(
                $("<a class=\"profile\" href=\"#\">VAI AL PROFILO</a>")
                    .hide()
                    .fadeIn(120)
            )
        }
    });

    $("li").each((i, e) => {
        setTimeout(() => $(e).css("opacity", 1), i * 120);
        setTimeout(() => $(e).removeClass("highlighted"), 500 + i * 100);

    });
});