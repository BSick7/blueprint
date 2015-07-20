import config = require('../config');
import ResourceViewModel = require('./ResourceViewModel');
import ContainerViewModel = require('./ContainerViewModel');
import IResource = blueprint.core.IResource;
import IResourceMetadata = blueprint.core.metadata.IResourceMetadata;

class BundleViewModel extends Fayde.MVVM.ViewModelBase implements IResourceMetadata {
    uid: any;
    bundle: string;
    group: string;
    name: string;
    description: string;
    thumbnail: string;
    tags: string[];
    isContainer: boolean;

    constructor(res: config.IBlueprintResourceConfig, bundle: config.IBlueprintBundleConfig, isContainer: boolean) {
        super();
        this.uid = res.uid;
        this.bundle = bundle.name;
        this.group = res.group;
        this.name = res.name;
        this.description = res.description;
        this.thumbnail = res.thumbnail;
        this.tags = res.tags;
        this.isContainer = isContainer;
    }

    createObject(): IResource {
        if (this.isContainer)
            return new ContainerViewModel(this.uid);
        return new ResourceViewModel(this.uid);
    }
}
Fayde.MVVM.NotifyProperties(BundleViewModel, ["uid", "bundle", "group", "name", "description", "thumbnail", "tags", "isContainer"]);
export = BundleViewModel;