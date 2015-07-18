import config = require('../config');
import ObservableCollection = Fayde.Collections.ObservableCollection;
import IResourceMetadata = blueprint.core.metadata.IResourceMetadata;

class BundlesViewModel extends Fayde.MVVM.ViewModelBase {
    Items = new ObservableCollection<IResourceMetadata>();

    Setup (bundles: exjs.IEnumerableEx<config.IBlueprintBundleConfig>) {
        this.Items.Clear();
        this.Items.AddRange(meta.createAll(bundles).toArray());
    }
}
Fayde.MVVM.NotifyProperties(BundlesViewModel, []);
export = BundlesViewModel;

module meta {
    export function createAll (bundles: exjs.IEnumerableEx<config.IBlueprintBundleConfig>): exjs.IEnumerableEx<IResourceMetadata> {
        return bundles.selectMany(bundle => bundle.containers.map(cont => createContainer(bundle, cont)))
            .concat(bundles.selectMany(bundle => bundle.resources.map(res => createResource(bundle, res))));
    }

    function createContainer (bundle: config.IBlueprintBundleConfig, cont: config.IBlueprintContainerConfig): IResourceMetadata {
        var meta = createResource(bundle, cont);
        meta.isContainer = true;
        return meta;
    }

    function createResource (bundle: config.IBlueprintBundleConfig, res: config.IBlueprintResourceConfig): IResourceMetadata {
        return {
            uid: res.uid,
            bundle: bundle.name,
            group: res.group,
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail,
            tags: res.tags,
            isContainer: false
        };
    }
}