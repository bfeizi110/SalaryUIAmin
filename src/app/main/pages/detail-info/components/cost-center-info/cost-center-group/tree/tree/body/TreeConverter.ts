export class TreeConverter {

  static setNodeByParentId(tree) {

    var map = {}, node, roots = [], i
    for (i = 0; i < tree.length; i += 1) {
      var Id = tree[i].hasOwnProperty('Id') ? tree[i].Id : tree[i].ID
      map[Id] = i; // initialize the map
      tree[i]['children'] = [] // initialize the children
    }
    for (i = 0; i < tree.length; i += 1) {
      node = tree[i]
      node['HasChild'] = false
      //node["Model"] = node;
      var parentId = node.hasOwnProperty('ParentId_Fld') ? node.ParentId_Fld : (node.hasOwnProperty('ParentId_Fld') ? node.ParentId_Fld : node.ParentId_Fld)
      if (parentId != null && parentId != "0") {
        // if you have dangling branches check that map[node.parentId] exists
        tree[map[parentId]].children.push(node)
        tree[map[parentId]]['HasChild'] = true
      } else {
        node['HasChild'] = node.children.length > 0
        roots.push(node)
      }
    }
    return roots
  }

  static setNodeByParentIdOrg(tree) {

    var map = {}, node, roots = [], i
    for (i = 0; i < tree.length; i += 1) {
      var Id = tree[i].hasOwnProperty('Id') ? tree[i].Id : tree[i].ID
      map[Id] = i; // initialize the map
      tree[i]['children'] = [] // initialize the children
    }
    for (i = 0; i < tree.length; i += 1) {
      node = tree[i]
      node['HasChild'] = false
      //node["Model"] = node;
      var parentId = node.hasOwnProperty('ParentID') ? node.ParentID : (node.hasOwnProperty('ParentID') ? node.ParentID : node.ParentID)
      if (parentId != null && parentId != "0") {
        // if you have dangling branches check that map[node.parentId] exists
        tree[map[parentId]].children.push(node)
        tree[map[parentId]]['HasChild'] = true
      } else {
        node['HasChild'] = node.children.length > 0
        roots.push(node)
      }
    }
    return roots
  }

  static menuConvertor(tree) {

    var map = {}, node, roots = [], i
    for (i = 0; i < tree.length; i += 1) {
      var Id = tree[i].hasOwnProperty('Id') ? tree[i].Id : tree[i].ID
      map[Id] = i; // initialize the map
      tree[i]['children'] = [] // initialize the children
    }
    for (i = 0; i < tree.length; i += 1) {
      node = tree[i]
      node['HasChild'] = false
      //node["Model"] = node;
      var ParentId = node.hasOwnProperty('ParentId') ? node.ParentId : (node.hasOwnProperty('ParentId') ? node.ParentId : node.ParentId)
      if (ParentId != null && ParentId != "0") {
        // if you have dangling branches check that map[node.parentId] exists
        tree[map[ParentId]].children.push(node)
        tree[map[ParentId]]['HasChild'] = true
      } else {
        node['HasChild'] = node.children.length > 0
        roots.push(node)
      }
    }
    return roots
  }

}
