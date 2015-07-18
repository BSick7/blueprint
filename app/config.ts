export interface IBlueprintConfig {
    bundles: IBlueprintBundle[];
}
export interface IBlueprintBundle {
    name: string;
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