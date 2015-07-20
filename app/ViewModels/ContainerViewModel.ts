import ResourceViewModel = require('./ResourceViewModel');
import ObservableCollection = Fayde.Collections.ObservableCollection;
import IResource = blueprint.core.IResource;

class ContainerViewModel extends ResourceViewModel {
    Children = new ObservableCollection<IResource>();

    get children(): exjs.IEnumerableEx<IResource> {
        return exjs.en(this.Children);
    }
}
Fayde.MVVM.NotifyProperties(ContainerViewModel, ["Children"]);
export = ContainerViewModel;