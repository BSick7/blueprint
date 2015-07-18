export interface IBlueprintConfig {
    bundles: string[];
}

export function load (): Promise<IBlueprintConfig> {
    return new Promise<IBlueprintConfig>((resolve, reject) => {
        require(["text!blueprint.json"], (jsonFile: string) => {
            try {
                var result = JSON.parse(jsonFile);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }, (err) => {
            reject(err);
        });
    });
}

export interface IBlueprintBundleConfig {
    found: boolean;
    loadError: any;
    name: string;
    containers: IBlueprintContainerConfig[];
    resources: IBlueprintResourceConfig[];
}
export interface IBlueprintResourceConfig {
    uid: string;
    group: string;
    name: string;
    description?: string;
    tags?: string[];
    thumbnail?: string;
}
export interface IBlueprintContainerConfig extends IBlueprintResourceConfig {
}

export function getBundles (config: IBlueprintConfig): Promise<exjs.Map<string, IBlueprintBundleConfig>> {
    var bundles: string[] = (!config ? [] : config.bundles) || [];
    var map = bundles.en()
        .toMap(bundle => bundle, bundle => <IBlueprintBundleConfig>{
            found: null,
            loadError: null,
            name: null,
            containers: null,
            resources: null
        });
    return new Promise((resolve, reject) => {
        var toresolve = bundles.slice(0);

        function tryFinish (cur: string) {
            toresolve.splice(toresolve.indexOf(cur), 1);
            if (toresolve.length <= 0)
                resolve(map);
        }

        map.forEach((bconf, bundle) => {
            resolveBundle(bundle)
                .then(rbconf => {
                    bconf.found = true;
                    bconf.name = rbconf.name;
                    bconf.containers = rbconf.containers;
                    bconf.resources = rbconf.resources;
                    tryFinish(bundle);
                }, err => {
                    bconf.found = false;
                    bconf.loadError = err;
                    tryFinish(bundle);
                });
        });
    });
}
function resolveBundle (bundle: string): Promise<IBlueprintBundleConfig> {
    return new Promise((resolve, reject) => {
        require(["text!" + bundle + "/blueprint.json"], (jsonFile: string) => {
            try {
                resolve(JSON.parse(jsonFile));
            } catch (err) {
                reject(err);
            }
        }, reject);
    });
}