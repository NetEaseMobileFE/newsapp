import queue from './queue'
export default function settings(...args) {
	const goon = queue.push({ func: settings, args })
	if (!goon) {
		return
	}
	const callback = args[0]
	window.__newsapp_settings_done = (info) => {
		window.__newsapp_settings_done = null
		queue.shift()
		callback(info)
	}
	queue.invoke('settings://')
}
