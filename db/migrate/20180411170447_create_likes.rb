class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.boolean :liked
      t.boolean :disliked
      t.references :user, foreign_key: true
      t.references :definition, foreign_key: true

      t.timestamps
    end
  end
end
