/**
 * 单例类统一继承
 */
// export class Singleton {

//     public static Inst<T>(this, ...param: any[]): T {
//         let Class: any = this;
//         if (!Class._inst) {
//             Class._inst = new Class(...param);
//         }
//         return Class._inst;
//     }

// }

export abstract class Singleton {

    // 泛型静态方法 Inst，用于获取单例实例
    // 在 this 中指定 `typeof this`，以推断实例类型
    public static Inst<T extends Singleton>(this: new (...args: any[]) => T, ...param: any[]): T {
        let Class: any = this;
        if (!Class._inst) {
            Class._inst = new Class(...param);
        }
        return Class._inst;
    }
}
