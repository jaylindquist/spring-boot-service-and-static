// Model
Store = {
    franchises: Ember.A(),
    defaultFranchise: function() {
        return this.franchises[0];
    },
    get: function(id) {
        return this.franchises[id];
    },
    init: function() {
        if(this.franchises.length == 0) {
            this.franchises.pushObject(App.Franchise.create({
                id: 0,
                title:'Final Fantasy',
                games: Ember.A(),
                defaultGame: function() {
                    this.games[0];
                },
                get: function(id) {
                    return this.games[id];
                },
                init: function() {
                    if(this.games.length == 0) {
                        this.games.pushObject(App.Game.create({id:0, title:'Final Fantasy Type 0', releaseDate:'October 27, 2011'}));
                        this.games.pushObject(App.Game.create({id:1, title:'Final Fantasy IV: The After Years', releaseDate:'February 18, 2008'}));
                        this.games.pushObject(App.Game.create({id:2, title:'Final Fantasy VII', releaseDate:'September 7, 1997'}));
                    }
                }
            }));
            this.franchises.pushObject(App.Franchise.create({
                id:1, 
                title:'Fire Emblem',
                games: Ember.A(),
                defaultGame: function() {
                    this.games[0];
                },
                get: function(id) {
                    return this.games[id];
                },
                init: function() {
                    if(this.games.length == 0) {
                        this.games.pushObject(App.Game.create({id:0, title:'Fire Emblem Awakening', releaseDate:'February 4, 2013'}));
                        this.games.pushObject(App.Game.create({id:1, title:'Fire Emblem Shadow Dragon', releaseDate:'February 16, 2009'}));
                    } 
                }
            }));
            this.franchises.pushObject(App.Franchise.create({
                id:2, 
                title:'The Legend of Zelda',
                games: Ember.A(),
                defaultGame: function() {
                    this.games[0];
                },
                get: function(id) {
                    return this.games[id];
                },
                init: function() {
                    if(this.games.length == 0) {
                        this.games.pushObject(App.Game.create({id:0, title:'The Legend of Zelda: Skyward Sword', releaseDate:'November 20, 2011'}));
                        this.games.pushObject(App.Game.create({id:1, title:'The Legend of Zelda: Ocarina of Time', releaseDate:'February 26, 2007'}));
                        this.games.pushObject(App.Game.create({id:2, title:'The Legend of Zelda: A Link to the Past', releaseDate:'November 21, 1991'}));
                    }
                }
            }));
        }
        this.franchises.forEach(function(f) {
            f.init();
        });
    }
};

// Application
App = Ember.Application.create({});

// Model definition
App.Franchise = Ember.Object.extend({});
App.Game = Ember.Object.extend({});

App.GameStore = Store;
App.GameStore.init();

// router
App.Router.map(function() {
    this.resource('franchise', { path:'/franchise/:franchise_id'}, function() {
        this.resource('game', { path: '/game/:game_id' });
    });
});

// routes
App.ApplicationRoute = Ember.Route.extend({
    setupController: function(applicationController) {
        applicationController.set('franchises', App.GameStore.franchises);
    }
});

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('franchise', App.GameStore.defaultFranchise());
    }
});

App.FranchiseRoute = Ember.Route.extend({
    model: function(params) {
        return App.GameStore.get(parseInt(params.franchise_id));
    }
});

App.GameRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor('franchise').get(parseInt(params.game_id));
    }
});