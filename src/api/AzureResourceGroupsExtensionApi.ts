/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzExtTreeDataProvider, AzExtTreeItem } from '@microsoft/vscode-azext-utils';
import { Disposable, TreeView } from 'vscode';
import { ActivityBase } from '../activityLog/Activity';
import { AppResourceResolver, AzureResourceGroupsExtensionApi, LocalResourceProvider } from '../api';

export class InternalAzureResourceGroupsExtensionApi implements AzureResourceGroupsExtensionApi {
    #tree: AzExtTreeDataProvider;
    #treeView: TreeView<AzExtTreeItem>;
    #apiVersion: string;
    #revealTreeItem: (resourceId: string) => Promise<void>;
    #registerApplicationResourceResolver: (id: string, resolver: AppResourceResolver) => Disposable;
    #registerLocalResourceProvider: (id: string, resolver: LocalResourceProvider) => Disposable;
    #registerActivity: <R>(activity: ActivityBase<R>) => Promise<R | undefined>;

    public constructor(options: AzureResourceGroupsExtensionApi) {
        this.#tree = options.tree;
        this.#treeView = options.treeView;
        this.#apiVersion = options.apiVersion;
        this.#revealTreeItem = options.revealTreeItem;
        this.#registerApplicationResourceResolver = options.registerApplicationResourceResolver;
        this.#registerLocalResourceProvider = options.registerLocalResourceProvider;
        this.#registerActivity = options.registerActivity;
    }

    public get tree(): AzExtTreeDataProvider {
        return this.#tree;
    }

    public get treeView(): TreeView<AzExtTreeItem> {
        return this.#treeView;
    }

    public get apiVersion(): string {
        return this.#apiVersion;
    }

    public async revealTreeItem(resourceId: string): Promise<void> {
        return await this.#revealTreeItem(resourceId);
    }

    public registerApplicationResourceResolver(id: string, resolver: AppResourceResolver): Disposable {
        return this.#registerApplicationResourceResolver(id, resolver);
    }

    public registerLocalResourceProvider(id: string, resolver: LocalResourceProvider): Disposable {
        return this.#registerLocalResourceProvider(id, resolver);
    }

    public async registerActivity<R>(activity: ActivityBase<R>): Promise<R | undefined> {
        return this.#registerActivity<R>(activity);
    }
}
