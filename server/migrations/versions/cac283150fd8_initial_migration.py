"""Initial migration.

Revision ID: cac283150fd8
Revises: 
Create Date: 2024-07-10 11:33:18.540833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cac283150fd8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('pet_type', sa.String(), nullable=False),
    sa.Column('breed', sa.String(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('adoptions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('pet_id', sa.Integer(), nullable=True),
    sa.Column('adoption_date', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['pet_id'], ['pets.id'], name=op.f('fk_adoptions_pet_id_pets')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_adoptions_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('adoptions')
    op.drop_table('users')
    op.drop_table('pets')
    # ### end Alembic commands ###
