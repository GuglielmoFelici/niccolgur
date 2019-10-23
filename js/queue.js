const section = "QUEUE";
$(document).ready(function () {
    let queue = $("#queue");
    $.each(db.queue, (i) => {
        let user = db.users[db.queue[i]];
        $("#queue").append(
            $("<li/>").append(
                $("<img/>")
                    .attr("src", (i, old) => `../data/images/${user.img}`),
                `<h2>${user.nickname}</h2>`,
                `<p>${user.bio}</p>`,
            ).addClass((x, old) => i === 0 ? "master" : "")
                .addClass("highlighted")
        );
    })
    $("li").addClass("highlighted");
    $("li").on("click", (event) => {
        $(".highlighted").removeClass("highlighted");
        $(event.currentTarget).addClass("highlighted");
    });
    $("li").each((i, e) =>
        setTimeout(() => $(e).removeClass("highlighted"), 500 + i * 100)
    );
    $("li").children().css("transition", "500ms");
});