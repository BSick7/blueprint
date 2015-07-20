import config = require('../config');
import BundlesViewModel = require('./BundlesViewModel');
import BundleViewModel = require('./BundleViewModel');
import ResourceViewModel = require('./ResourceViewModel');
import ContainerViewModel = require('./ContainerViewModel');

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    IsLoading = false;
    Bundles = new BundlesViewModel();
    RootContainer = new ContainerViewModel(null);

    constructor() {
        super();
        this.Load();
    }

    Load() {
        this.IsLoading = true;
        config.load()
            .then(conf => config.getBundles(conf))
            .then(bundles => {
                this.IsLoading = false;
                this.Bundles.Setup(bundles.values());
            })
            .catch(err => this.IsLoading = false);
    }

    CreateResource(args: Fayde.IEventBindingArgs<any>) {
        var bundle = <BundleViewModel>args.parameter;
        var obj = bundle.createObject();
        this.RootContainer.Children.Add(obj);
    }
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["IsLoading"]);
export = MainViewModel;