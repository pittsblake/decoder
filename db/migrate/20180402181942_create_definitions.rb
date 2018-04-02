class CreateDefinitions < ActiveRecord::Migration[5.1]
  def change
    create_table :definitions do |t|
      t.string :definition
      t.references :user, foreign_key: true
      t.references :topic, foreign_key: true

      t.timestamps
    end
  end
end
