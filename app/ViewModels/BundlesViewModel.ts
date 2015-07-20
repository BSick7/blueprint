import config = require('../config');
import BundleViewModel = require('./BundleViewModel');
import ObservableCollection = Fayde.Collections.ObservableCollection;

class BundlesViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new ObservableCollection<BundleViewModel>();

    Setup(bundles: exjs.IEnumerableEx<config.IBlueprintBundleConfig>) {
        this.Items.Clear();
        this.Items.AddRange(meta.createAll(bundles).toArray());
    }
}
Fayde.MVVM.NotifyProperties(BundlesViewModel, []);
export = BundlesViewModel;

module meta {
    export function createAll(bundles: exjs.IEnumerableEx<config.IBlueprintBundleConfig>): exjs.IEnumerableEx<BundleViewModel> {
        return bundles.selectMany(bundle => bundle.containers.map(cont => createContainer(bundle, cont)))
            .concat(bundles.selectMany(bundle => bundle.resources.map(res => createResource(bundle, res))));
    }

    function createContainer(bundle: config.IBlueprintBundleConfig, cont: config.IBlueprintContainerConfig): BundleViewModel {
        return new BundleViewModel(cont, bundle, true);
    }

    function createResource(bundle: config.IBlueprintBundleConfig, res: config.IBlueprintResourceConfig): BundleViewModel {
        return new BundleViewModel(res, bundle, false);
    }
}