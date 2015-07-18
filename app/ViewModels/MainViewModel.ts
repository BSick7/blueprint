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
            .then(config => {
                this.IsLoading = false;
            }, err => {
                this.IsLoading = false;
            });
    }
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["IsLoading"]);
export = MainViewModel;