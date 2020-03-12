
import { AutoViewInit, RecordElemChangeCb } from './types';
import { each } from './utils';

export default function usePlugin(pluginInit: AutoViewInit): { pluginListener?: RecordElemChangeCb} {
    
    // 寻找插件 - 调试模式下尝试挂载部署在 window 上的插件
    let plugins = pluginInit.plugins || []
    if (pluginInit.devMode) {
        plugins = plugins.concat((window as any).autoViewPlugins)
    }

    // 执行插件 create 方法
    each(plugins, (plugin) => plugin.create(pluginInit))

    // 生成 update 方法数组
    let updates: RecordElemChangeCb[] = []
    each(plugins, (plugin) => plugin && (updates.push(plugin.update)))

    if (updates.length === 0) {
        return {}
    }
    return {
        pluginListener: (elem, idx, option) => each(updates, (update) => update(elem, idx, option))
    }
}