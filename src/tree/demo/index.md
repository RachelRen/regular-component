---
Tree
树形控件
---

## 如何使用
树形结构可以完整而又清晰地展示层级关系，而且具有展开收缩功能。

## API

<table>
    <thead>
        <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>multiple</td>
            <td>支持点选多个节点（节点本身）</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>onExpand</td>
            <td>展开/收起节点时触发</td>
            <td>function(expandedKeys, {expanded: bool, node})</td>
            <td>-</td>
        </tr>
        <tr>
            <td>onSelect</td>
            <td>点击树节点触发</td>
            <td>function(selectedKeys, e:{selected: bool, selectedNodes, node, event})</td>
            <td>-</td>
        </tr>
        <tr>
            <td>list</td>
            <td>数据源</td>
            <td>object[]</td>
            <td>-</td>
        </tr>
        <tr>
            <td>service</td>
            <td>异步加载数据</td>
            <td>function(node)</td>
            <td>-</td>
        </tr>
    </tbody>
    
</table>
