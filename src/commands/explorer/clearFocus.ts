/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { GroupTreeItemBase } from "../../tree/GroupTreeItemBase";
import { settingUtils } from "../../utils/settingUtils";

export async function clearFocus(): Promise<void> {

    await settingUtils.updateGlobalSetting('focusedGroup', null);
    GroupTreeItemBase.focusedGroupId = undefined;
    // void ext.tree.refresh(context, group?.parent);
}
