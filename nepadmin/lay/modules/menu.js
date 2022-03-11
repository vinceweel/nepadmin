layui.define([], function (exports) {
    var $ = layui.jquery

    function _fetch() {
        if (!layui.menu.raw && window.self == window.top) {
            $.ajax({
                url: layui.api.getMenu,
                type: 'get',
                dataType: 'json',
                success: function (res) {
                    layui.menu.raw = res.data
                    layui.menu.clean = layui.menu.flat(function (item) { return !!item.href })
                },
                error: function (err) {
                    console.log('获取菜单失败！', err);
                }
            })
        }
    }

    function _flat(filterCallback) {
        var menu = layui.menu.raw
        if (!menu) return
        var ret = []
        var parse = function (items) {
            layui.each(items, function (_, item) {
                if (item.childs) parse(item.childs)
                ret.push(item)
            })
        }
        parse(menu)
        if (!filterCallback) return ret
        return ret.filter(filterCallback)
    }

    function _filter(filterCallback) {
        var list = layui.menu.raw
        if (!list) return
        return list.filter(filterCallback)
    }

    exports('menu', {
        raw: null,
        clean: null,
        fetch: _fetch,
        flat: _flat,
        filter: _filter
    });
})