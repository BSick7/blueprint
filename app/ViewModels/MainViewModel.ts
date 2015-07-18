import config = require('../config');

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    IsLoading = false;

    constructor () {
        super();
        this.Load();
    }

    Load () {
        this.IsLoading = true;
        config.load()
            .then(conf => config.getBundles(conf))
            .then(bundles => {
                this.IsLoading = false;
            })
            .catch(err => this.IsLoading = false);
    }
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["IsLoading"]);
export = MainViewModel;