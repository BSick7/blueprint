import config = require('../config');
import BundlesViewModel = require('./BundlesViewModel');

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    IsLoading = false;
    Bundles = new BundlesViewModel();

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
                this.Bundles.Setup(bundles.values());
            })
            .catch(err => this.IsLoading = false);
    }
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["IsLoading"]);
export = MainViewModel;