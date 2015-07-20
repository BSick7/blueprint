import IResource = blueprint.core.IResource;
import IContainer = blueprint.core.IContainer;
import ILink = blueprint.core.ILink;
import ObservableCollection = Fayde.Collections.ObservableCollection;

class ResourceViewModel extends Fayde.MVVM.ViewModelBase implements IResource {
    id: any;
    metadataUid: string;
    owner: IContainer = null;
    Links = new ObservableCollection<ILink>();

    get links(): exjs.IEnumerableEx<ILink> {
        return exjs.en(this.Links);
    }

    constructor(metadataUid: string) {
        super();
        //TODO: Create new uuid for id
        this.metadataUid = metadataUid;
    }
}
Fayde.MVVM.NotifyProperties(ResourceViewModel, ["metadataUid", "owner", "Links"]);
export = ResourceViewModel;