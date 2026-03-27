import { motion } from 'framer-motion';

const treeData = {
  name: 'মরহুম আব্দুল গফুর',
  relation: 'প্রতিষ্ঠাতা',
  children: [
    { name: 'আব্দুল করিম', relation: 'বড় ছেলে', children: [
      { name: 'মোহাম্মদ সাইফ', relation: 'নাতি', children: [] },
    ]},
    { name: 'ফাতেমা বেগম', relation: 'বড় মেয়ে', children: [] },
    { name: 'আব্দুল হালিম', relation: 'মেজো ছেলে', children: [] },
    { name: 'আব্দুল রহিম', relation: 'সেজো ছেলে', children: [] },
    { name: 'আয়েশা খাতুন', relation: 'ছোট মেয়ে', children: [] },
  ],
};

interface TreeNode {
  name: string;
  relation: string;
  children: TreeNode[];
}

function TreeNodeComponent({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: depth * 0.15 }}
        className={`px-5 py-3 rounded-xl border border-border text-center ${
          depth === 0 ? 'gradient-gold text-primary-foreground shadow-lg' : 'bg-card hover:shadow-md transition-shadow'
        }`}
      >
        <p className="font-bold text-sm">{node.name}</p>
        <p className={`text-xs mt-0.5 ${depth === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{node.relation}</p>
      </motion.div>

      {node.children.length > 0 && (
        <>
          <div className="w-px h-6 bg-border" />
          <div className="flex gap-4 flex-wrap justify-center relative">
            {node.children.length > 1 && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-border" style={{ width: `${Math.min(node.children.length * 120, 600)}px` }} />
            )}
            {node.children.map((child, i) => (
              <div key={i} className="flex flex-col items-center">
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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🌳 পারিবারিক বৃক্ষ</h1>
        <p className="text-muted-foreground text-sm mt-1">আমাদের পরিবারের বংশ পরম্পরা</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-8 overflow-x-auto">
        <div className="flex justify-center min-w-[600px]">
          <TreeNodeComponent node={treeData} />
        </div>
      </div>
    </div>
  );
}
