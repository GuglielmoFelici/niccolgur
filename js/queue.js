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
            ).attr("class", (x, old) => i === 0 ? "master" : "")
        );
    })
    $("li").on("click", (event) => {
        $(".highlighted").removeClass("highlighted");
        $(event.currentTarget).addClass("highlighted");
    });
});