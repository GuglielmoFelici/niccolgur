const section = "QUEUE";
$(document).ready(function () {
    let queue = $("#queue");

    $.each(db.queue, (i) => {
        let user = db.users[db.queue[i]];
        $("#queue").append(
            $("<li/>")
                .append(
                    $("<img/>")
                        .attr("src", (i, old) => `../data/images/${user.img}`),
                    `<h2>${user.nickname}</h2>`,
                    `<p>${user.bio}</p>`,
                    $("<a/>")
                        .attr("href", () => "#")
                        .append(
                            $("<img/>")
                                .attr("src", () => "../data/images/profile.png")
                        )
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
        if (!isSame) {
            $(event.currentTarget).addClass("highlighted");
        }
    });

    $("li").each((i, e) => {
        $(e).css("opacity", 1);
        setTimeout(() => $(e).removeClass("highlighted"), 500 + i * 100);

    });
});