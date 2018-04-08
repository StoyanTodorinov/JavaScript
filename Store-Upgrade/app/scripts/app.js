function run() {
    renderer.respond('home');

    $(window).on('load', function(){
        location.hash = '#/home';
        helper.hideLoading();
    });

    $(window).on('hashchange',function() {
        renderer.respond(location.hash.slice(2).replace(/:.*/, ''));
    });
}

run();