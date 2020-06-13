class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages
  has_many :groups, through: :group_users
  has_many :group_users

  validates :name, presence: true, uniqueness: true

  def self.search(search,id)
    return nil if search == ""
    User.where(['name LIKE (?)',"%#{search}%"]).where.not(id: id).limit(10)
  end
end
