/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IActionContext } from "@microsoft/vscode-azext-utils";
import { ext } from "../../extensionVariables";
import { GroupTreeItemBase } from "../../tree/GroupTreeItemBase";
import { settingUtils } from "../../utils/settingUtils";

export async function focusGroup(context: IActionContext, group?: GroupTreeItemBase): Promise<void> {
    const groupTreeItem: GroupTreeItemBase = group ?? await ext.tree.showTreeItemPicker('azExtGroup', context);
    if (!groupTreeItem) {
        return;
    }
    await settingUtils.updateGlobalSetting('focusedGroup', groupTreeItem.id);
    GroupTreeItemBase.focusedGroupId = groupTreeItem.id;
    // await ext.tree.refresh(context, groupTreeItem.parent);
}
