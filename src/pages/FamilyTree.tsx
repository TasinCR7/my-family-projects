import { motion } from 'framer-motion';
import { useMembers } from '@/hooks/useSupabaseData';
import { Loader2, Users } from 'lucide-react';

interface TreeNode {
  id: string;
  name: string;
  relation: string;
  children: TreeNode[];
}

function buildTree(members: any[]): TreeNode[] {
  const treeMap: Record<string, TreeNode> = {};
  const roots: TreeNode[] = [];

  // First pass: Create nodes
  members.forEach(member => {
    treeMap[member.id] = {
      id: member.id,
      name: member.name,
      relation: member.relation || 'সদস্য',
      children: []
    };
  });

  // Second pass: Connect parents and children
  members.forEach(member => {
    if (member.parentId && treeMap[member.parentId]) {
      treeMap[member.parentId].children.push(treeMap[member.id]);
    } else {
      roots.push(treeMap[member.id]);
    }
  });

  return roots;
}

function TreeNodeComponent({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: depth * 0.15 }}
        className={`px-5 py-3 rounded-xl border border-border text-center min-w-[120px] ${
          depth === 0 ? 'gradient-gold text-primary-foreground shadow-lg' : 'bg-card hover:shadow-md transition-shadow'
        }`}
      >
        <p className="font-bold text-sm whitespace-nowrap">{node.name}</p>
        <p className={`text-[10px] mt-0.5 ${depth === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{node.relation}</p>
      </motion.div>

      {node.children.length > 0 && (
        <>
          <div className="w-px h-6 bg-border" />
          <div className="flex gap-4 flex-wrap justify-center relative">
            {node.children.length > 1 && (
              <div className="absolute top-0 left-0 right-0 h-px bg-border mx-auto px-4" style={{ width: 'calc(100% - 40px)' }} />
            )}
            {node.children.map((child, i) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-6 bg-border" />
                <TreeNodeComponent node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FamilyTree() {
  const { members, loading } = useMembers();
  const treeRoots = buildTree(members);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">পারিবারিক বৃক্ষ তৈরি হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🌳 পারিবারিক বৃক্ষ</h1>
        <p className="text-muted-foreground text-sm mt-1">আমাদের পরিবারের বংশ পরম্পরা</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-8 overflow-x-auto">
        <div className="flex flex-col justify-center min-w-[800px] py-10">
          {treeRoots.length === 0 ? (
            <div className="text-center p-20 opacity-20">
              <Users size={64} className="mx-auto" />
              <p className="mt-4 font-bold">কোনো সদস্য পাওয়া যায়নি।</p>
            </div>
          ) : (
            treeRoots.map(root => (
              <div key={root.id} className="mb-20 last:mb-0">
                <TreeNodeComponent node={root} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
