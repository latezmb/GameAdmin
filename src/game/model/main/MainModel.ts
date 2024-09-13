export default class MainModel {

    public static data: {[id: number]: ProjectMenu} = {
        1: {
            id: 1,
            title: "开心通关",
            wins: [
                {txt: "修复关卡", win: "RepairWindow"},
            ]
        }
    }

    public static get dataIdList() {
        let list: number[] = [];
        for(let key in this.data) {
            list.push(Number(key));
        }
        return list;
    }

    public static getDataById(id: number): ProjectMenu {
        return this.data[id];
    }

}

export interface ProjectMenu {
    id: number,
    /**标题 */
    title: string,
    /**功能 */
    wins: ProjectMenuWin [];
}

export interface ProjectMenuWin {
    txt: string,
    win: string
}